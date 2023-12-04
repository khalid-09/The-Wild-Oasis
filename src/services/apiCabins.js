import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}; // read all row data from cabins table

export const deleteCabins = async id => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}; // delete a row from cabins table which paased id

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // 0. Create a unique image name & path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit a cabin
  let query = supabase.from('cabins');

  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B.Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded & the cabin was created'
    );
  } // 3. Delete the cabin if there was an error uploading image

  return data;
}; // creates a new row in cabins table
