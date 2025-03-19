import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    console.log('Checking Supabase connection...');
    
    const diagnostics: any = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'not set',
      supabaseKeyValid: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      tables: {},
      rowLevelSecurityPolicies: {},
      connectionTest: null,
      serviceRole: false,
    };
    
    // Test connection
    const { data: connectionData, error: connectionError } = await supabase.from('contact_forms').select('count').limit(0);
    
    if (connectionError) {
      diagnostics.connectionTest = {
        success: false,
        error: connectionError.message,
        code: connectionError.code,
        details: connectionError.details,
      };
    } else {
      diagnostics.connectionTest = {
        success: true
      };
    }
    
    // Check which tables exist
    const tables = ['contact_forms', 'service_bookings', 'orders', 'order_items'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('count').limit(0);
        
        diagnostics.tables[table] = {
          exists: !error || !error.message.includes('does not exist'),
          error: error ? error.message : null,
          errorCode: error ? error.code : null,
        };
      } catch (e) {
        diagnostics.tables[table] = {
          exists: false,
          error: e instanceof Error ? e.message : 'Unknown error',
        };
      }
    }
    
    // Try to insert a test record
    try {
      const testEntry = {
        name: 'Test',
        email: 'test@example.com',
        subject: 'Diagnostic Test',
        message: 'This is an automated test of the Supabase connection.',
        status: 'new'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('contact_forms')
        .insert(testEntry)
        .select();
        
      diagnostics.insertTest = {
        success: !insertError,
        error: insertError ? insertError.message : null,
        code: insertError ? insertError.code : null,
        details: insertError ? insertError.details : null,
        data: insertData
      };
      
      if (!insertError && insertData && insertData.length > 0) {
        // Clean up - remove the test entry
        const { error: deleteError } = await supabase
          .from('contact_forms')
          .delete()
          .eq('id', insertData[0].id);
          
        diagnostics.deleteTest = {
          success: !deleteError,
          error: deleteError ? deleteError.message : null
        };
      }
    } catch (error) {
      diagnostics.insertTest = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
    
    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error('Error in Supabase diagnostics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to run diagnostics', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 