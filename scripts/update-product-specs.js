import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Specifications to add to both products
const specifications = {
  "Cord length": "1.8m",
  "Length": "220 mm",
  "Width": "220 mm", 
  "Height": "1050 mm",
  "Weight": "4.65kg",
  "Oscillation/Angle": "350°",
  "Filter life": "1 year for HEPA+Carbon filter",
  "Standby power consumption": "< 0.5W",
  "Room coverage": "81m² (according to POLAR)",
  "Sound level": "59.8dB"
};

async function updateProductSpecifications() {
  try {
    console.log('Starting product specifications update...');

    // Get all products first to find Nest and Storm
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, slug, specifications');

    if (fetchError) {
      throw fetchError;
    }

    console.log('Found products:', products?.map(p => ({ name: p.name, slug: p.slug })));

    // Find Nest and Storm products
    const nestProduct = products?.find(p => 
      p.name.toLowerCase().includes('nest') || p.slug.toLowerCase().includes('nest')
    );
    
    const stormProduct = products?.find(p => 
      p.name.toLowerCase().includes('storm') || p.slug.toLowerCase().includes('storm')
    );

    // Update Nest product specifications
    if (nestProduct) {
      console.log('Updating Nest product specifications...');
      
      const { data: nestData, error: nestError } = await supabase
        .from('products')
        .update({ 
          specifications: {
            ...nestProduct.specifications,
            ...specifications
          }
        })
        .eq('id', nestProduct.id)
        .select();

      if (nestError) {
        console.error('Error updating Nest product:', nestError);
      } else {
        console.log('✅ Nest product specifications updated successfully');
        console.log('Updated Nest product:', nestData[0]);
      }
    } else {
      console.log('❌ Nest product not found');
    }

    // Update Storm product specifications  
    if (stormProduct) {
      console.log('Updating Storm product specifications...');
      
      const { data: stormData, error: stormError } = await supabase
        .from('products')
        .update({ 
          specifications: {
            ...stormProduct.specifications,
            ...specifications
          }
        })
        .eq('id', stormProduct.id)
        .select();

      if (stormError) {
        console.error('Error updating Storm product:', stormError);
      } else {
        console.log('✅ Storm product specifications updated successfully');
        console.log('Updated Storm product:', stormData[0]);
      }
    } else {
      console.log('❌ Storm product not found');
    }

    console.log('Script completed!');

  } catch (error) {
    console.error('Error updating product specifications:', error);
  }
}

// Run the script
updateProductSpecifications();