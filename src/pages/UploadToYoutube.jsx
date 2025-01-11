import { createClient } from '@supabase/supabase-js';

// Replace with your own Supabase URL and Key
const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to test the connection
async function checkConnection() {
    try {
        const { data, error } = await supabase
            .from('courses')  // Replace with your table name
            .select('*');

        if (error) {
            console.error('Error checking connection:', error.message);
        } else {
            console.log('Supabase is connected. Data:', data);
        }
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

// Call the function
checkConnection();

import React from 'react'

export default function UploadToYoutube() {
    return (
        <div>
            <button onClick={checkConnection}>Check connection</button>
        </div>
    )
}

