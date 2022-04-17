import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";

function App() {

	const [data, setData] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetch("https://openlibrary.org/search.json?author=tolkien")
			.then((response) => response.json())
			.then((data) => setData(data))
			.then(() => setLoading(false))
			.catch(setError);
	}, []);

	
	if (loading) {
		return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, 2)}</pre>;
	}

	if (!data.docs) {
		return null;
	}

	let x = data.docs;
	let y = data.docs;

	const searchHandler = (search) => {
		setSearch(search);
		if (search !== "") {
			const newBooksList = y.filter((i) => {
				return Object.values(i)
					.join(" ")
					.toLowerCase()
					.includes(search.toLowerCase());
			});
			setSearchResults(newBooksList);
		} else {
			setSearchResults(y);
		}
	};

	console.log(searchResults);

	return (
		<div className="container">
			<Header/>
			<Search term={search} searchKeyword={searchHandler} />
			<div>{search.length < 1 ? (
				<ul className="list">
					{x.map((item, i) => {
						return (
							<li key={i} className="list-item">
								<i className="fa-fa-book">
								&nbsp;
								{item.title}</i>								
								<div>
									<h3>Author: {item.author_name}</h3>
									<h4>First Published Year: {item.first_publish_year}</h4>	
									
								</div>
									
							</li>
							
						);
					})}
				</ul>
			) : (
				<ul className="list">
					{searchResults.map((item, i) => {
						return (
							<li key={i} className="list-item">
								<i className="fa-fa-book">
								&nbsp;
								{item.title}</i>
								<div>
									<h3>Author: {item.author_name}</h3>
									<h4>First Published Year: {item.first_publish_year}</h4>
								</div>
							</li>
						);
					})}
				</ul>
			)}
			</div>
			<Footer/>
		</div>
	);
}
export default App;