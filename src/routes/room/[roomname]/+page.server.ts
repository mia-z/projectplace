import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/client";

export const load: PageServerLoad = async ({ params }) => {
    const roomRes = await supabase.from("rooms").select().returns<RoomData[]>();

    console.log(roomRes);
    return {};
};
