import { supabase } from "./client"

export const RoomsWithoutDataQuery = async () => {
    const res = await supabase.from("rooms").select("room_name");
    if (res.error) {
        throw res.error;
    } else {
        return res.data;
    }
}