import React, { useState, useEffect } from 'react';

function ArticleList() {
  const [articles, setArticles] = useState(() => {
    const storedArticles = localStorage.getItem('articleList');
    return storedArticles ? JSON.parse(storedArticles) : [];
  });
  const [newArticles, setNewArticle] = useState('');

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('articleList'));
    setArticles(storedArticles);
  }, []);

  useEffect(() => {
    localStorage.setItem('articleList', JSON.stringify(articles));
  }, [articles]);

  const handleAddArticle = (e) => {
    e.preventDefault();
    if (newArticles.trim() !== '') {
      setArticles([...articles, newArticles]);
      setNewArticle('');
    }
  };

  const handleRemoveArtile = (index) => {
    setArticles(articles.filter((_, i) => i !== index));
  };

  return (
    <div>
    <form className='form-inline'>
      <h1>liste des Articles</h1>
      <div className='form-group'>
        <input type="text" value={newArticles} onChange={(e) => setNewArticle(e.target.value)}  placeholder="Add Article"/>
        <button onClick={handleAddArticle} className="btn btn-primary mb-2">Ajouter</button>
      </div>
    </form>
    <ul className='list-group'>
        {articles.map((article, index) => (
          <li className='list-group-item d-flex justify-content-between align-items-center' key={index}>
            {article}
            <button className='btn btn-danger ' onClick={() => handleRemoveArtile(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
