"use strict";
import { supabase } from "./supabase";

export async function get_inventory() {
    const { data: p3d_inventory, error } = await supabase
        .from("p3d_inventory")
        .select("*");
    const data = await p3d_inventory.json;
    if (error) {
        return console.log("Error: ", error);
    }
    return data;
}

/*

time since epoch time
Math.floor(new Date().getTime()/1000.0)
*/
