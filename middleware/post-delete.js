function deletePost() {
	const posts = document.querySelectorAll("i.trash");
	posts.forEach((element) => {
		element.addEventListener("click", (event) => {
			const endpoint = `/posts/delete/${element.dataset.doc}`;

			fetch(endpoint, { method: "DELETE" })
				.then((response) => response.json())
				.then((data) => (window.location.href = data.redirect))
				.catch((error) => console.log(error));
		});
	});
}
