import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import UserProfile from './components/UserProfile';

const App = () => {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const searchGithub = async (query) => {
        try {
            const repoResults = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
            setRepos(repoResults.data.items);
            setSelectedRepo(null);
            setUserProfile(null);
        } catch (error) {
            console.error('Error fetching data from GitHub:', error);
        }
    };

    const fetchUserProfile = async (username) => {
        try {
            setUserProfile(username);
            setRepos([]);
            setSelectedRepo(null);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <div>
            <h1>Github Explorer</h1>
            <SearchBar onSearch={searchGithub} />

            {repos.length > 0 && (
                <RepoList repos={repos} />
            )}

            {userProfile && <UserProfile username={userProfile} />}

            {selectedRepo && (
                <RepoDetails owner={selectedRepo.owner.login} repo={selectedRepo.name} />
            )}
        </div>
    );
};

export default App;
