import React from 'react';

const RepoList = ({ repos }) => {
    return (
        <div>
            <h2>Repository Results:</h2>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.full_name}
                        </a> - 🌟 {repo.stargazers_count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepoList;
