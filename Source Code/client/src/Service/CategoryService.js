import axios from "axios";
export const addCategory = async (category) => {
  const token = localStorage.getItem('token');
  console.log('Token before request:', token);

  return await axios.post(
    'http://localhost:8080/api/v1.0/admin/categories',
    category,
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
  .then(response => {
    console.log('addCategory success:', response);
    return response;
  })
  .catch(error => {
    console.log('addCategory error:', error.response || error);
    throw error;
  });
}


export const deleteCategory = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/admin/categories/${categoryId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const fetchCategories = async () => {
  const token = localStorage.getItem('token');
  console.log('Token (fetchCategories):', token);

  return await axios
    .get('http://localhost:8080/api/v1.0/categories', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log('fetchCategories success:', response);
      return response;
    })
    .catch((error) => {
      console.log('fetchCategories error:', error.response || error);
      throw error;
    });
};
