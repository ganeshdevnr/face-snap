import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { SupabaseService } from '../../core/services/supabase.service';
import { Channel } from '../../shared/models/channel.model';
import { Message } from '../../shared/models/message.model';

@Injectable({ providedIn: 'root' })
export class MessagingService {
  private readonly supabase = inject(SupabaseService).client;

  getChannels(userId: string): Observable<Channel[]> {
    return from(
      this.supabase
        .from('conversation_list_view')
        .select('*')
        .eq('my_user_id', userId)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => ({
          conversationId: row.conversation_id,
          userName: row.other_user_name,
          avatarUrl: row.other_user_avatar_url,
          unreadCount: row.unread_count,
          lastMessage: row.last_message,
          lastMessageTime: row.last_message_time,
        }));
      })
    );
  }

  getMessages(conversationId: string, before?: string): Observable<Message[]> {
    let query = this.supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(30);

    if (before) {
      query = query.lt('created_at', before);
    }

    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => this.mapToMessage(row));
      })
    );
  }

  sendMessage(conversationId: string, authorId: string, content: string): Observable<Message> {
    return from(
      this.supabase
        .from('messages')
        .insert({ conversation_id: conversationId, author_id: authorId, content, status: 'sent' })
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapToMessage(data);
      })
    );
  }

  deleteMessage(messageId: string): Observable<void> {
    return from(
      this.supabase.from('messages').delete().eq('id', messageId)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  updateMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read'): Observable<void> {
    return from(
      this.supabase.from('messages').update({ status }).eq('id', messageId)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  subscribeToMessages(conversationId: string): Observable<Message> {
    return new Observable<Message>((subscriber) => {
      const channel = this.supabase
        .channel(`messages-insert:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => subscriber.next(this.mapToMessage(payload.new))
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            subscriber.error(new Error(`Realtime channel error for conversation ${conversationId}`));
          }
        });

      return () => {
        this.supabase.removeChannel(channel);
      };
    });
  }

  subscribeToMessageStatus(conversationId: string): Observable<Message> {
    return new Observable<Message>((subscriber) => {
      const channel = this.supabase
        .channel(`messages-update:${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => subscriber.next(this.mapToMessage(payload.new))
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            subscriber.error(new Error(`Realtime channel error for conversation ${conversationId}`));
          }
        });

      return () => {
        this.supabase.removeChannel(channel);
      };
    });
  }

  subscribeToAllMessages(conversationIds: string[]): Observable<Message> {
    return new Observable<Message>((subscriber) => {
      const channel = this.supabase
        .channel('messages-all')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            if (conversationIds.includes(payload.new['conversation_id'])) {
              subscriber.next(this.mapToMessage(payload.new));
            }
          }
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            subscriber.error(new Error('Realtime channel error on messages-all'));
          }
        });

      return () => {
        this.supabase.removeChannel(channel);
      };
    });
  }

  private mapToMessage(row: any): Message {
    return {
      id: row.id,
      conversationId: row.conversation_id,
      authorId: row.author_id,
      content: row.content,
      status: row.status,
      createdAt: row.created_at,
      uiStatus: 'sent',
    };
  }
}
