// Copy and paste this script into your browser console when you're on your website
// Make sure you're logged in and have access to update products

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

async function updateProductSpecs() {
  try {
    // Import supabase from your app (assuming it's available globally)
    const { supabase } = await import('./src/lib/supabase.js');
    
    console.log('Starting product specifications update...');

    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, slug, specifications');

    if (fetchError) {
      console.error('Error fetching products:', fetchError);
      return;
    }

    console.log('Found products:', products?.map(p => ({ name: p.name, slug: p.slug })));

    // Find Nest and Storm products
    const nestProduct = products?.find(p => 
      p.name.toLowerCase().includes('nest') || p.slug.toLowerCase().includes('nest')
    );
    
    const stormProduct = products?.find(p => 
      p.name.toLowerCase().includes('storm') || p.slug.toLowerCase().includes('storm')
    );

    // Update Nest product
    if (nestProduct) {
      console.log('Updating Nest product...');
      const { data, error } = await supabase
        .from('products')
        .update({ 
          specifications: {
            ...nestProduct.specifications,
            ...specifications
          }
        })
        .eq('id', nestProduct.id)
        .select();

      if (error) {
        console.error('Error updating Nest:', error);
      } else {
        console.log('✅ Nest updated successfully:', data[0]);
      }
    }

    // Update Storm product
    if (stormProduct) {
      console.log('Updating Storm product...');
      const { data, error } = await supabase
        .from('products')
        .update({ 
          specifications: {
            ...stormProduct.specifications,
            ...specifications
          }
        })
        .eq('id', stormProduct.id)
        .select();

      if (error) {
        console.error('Error updating Storm:', error);
      } else {
        console.log('✅ Storm updated successfully:', data[0]);
      }
    }

    console.log('Update completed!');
  } catch (error) {
    console.error('Script error:', error);
  }
}

// Run the function
updateProductSpecs();