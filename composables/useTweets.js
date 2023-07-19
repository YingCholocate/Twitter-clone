import useFetchApi from "./useFetchApi";
// Tweet form 
export default ()=>{
    const postTweet=(formData)=>{
        const form=new FormData();
        form.append("text",formData.text)
        return useFetchApi('/api/user/tweets',{
            method:"POST",
            body:form
        })
    }

    const getHomeTweets=()=>{
        return new promises((resolve,reject)=>{
            try{
                const response=useFetchApi("/api/tweets",{
                    method:'GET'
                })
               
            }catch(error){

            }
        })
    }

    return {
        postTweet,
        getHomeTweets
    }
}