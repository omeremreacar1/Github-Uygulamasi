class Api{
    async getUserDatas(username){
        const userDatas = await (await fetch(`https://api.github.com/users/${username}`)).json();

        return userDatas;
    }

    async getReposDatas(username){
        const reposDatas = await (await fetch(`https://api.github.com/users/${username}/repos`)).json();

        return reposDatas;
    }
}