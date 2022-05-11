
const useAuth = (url) => {
    const [userData, setUserData] = useState({});
    const [fetchError, setFetchError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // functions
    // const { isLoading, data, error } = useGet('http://localhost:5000/api/private');


    useLayoutEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/private`, {
                    withCredentials: true,
                });
                setUserData(data.userInfo);
                setIsLoading(false)
            } catch (error) {
                setFetchError(error.response.data.msg);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser()
    }, [])
  return {userData, fetchError, isLoading}
  // return {data, error, isLoading}
}

export default useAuth
