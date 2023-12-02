import supabase from './supabase';

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

export const createCabin = async newCabin => {
  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabin])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be created');
  }

  return data;
}; // create a new row in cabins table
