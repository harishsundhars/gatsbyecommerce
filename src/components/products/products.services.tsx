import axios from "axios";

export const getServerSideProps = async () => {
   return await axios.get('https://dummyjson.com/products');
};
