export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            rooms: {
                Row: {
                    id: number;
                    room_data: string | null;
                    room_name: string;
                };
                Insert: {
                    id?: number;
                    room_data?: string | null;
                    room_name: string;
                };
                Update: {
                    id?: number;
                    room_data?: string | null;
                    room_name?: string;
                };
                Relationships: [];
            };
            users: {
                Row: {
                    active_token: string;
                    id: number;
                    nickname: string | null;
                    room_id: number | null;
                    username: string | null;
                };
                Insert: {
                    active_token: string;
                    id?: number;
                    nickname?: string | null;
                    room_id?: number | null;
                    username?: string | null;
                };
                Update: {
                    active_token?: string;
                    id?: number;
                    nickname?: string | null;
                    room_id?: number | null;
                    username?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "fk_room";
                        columns: ["room_id"];
                        referencedRelation: "rooms";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
