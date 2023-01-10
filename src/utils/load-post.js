export const loadPosts = async () => {
	const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
	const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
	const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

	const postsJson = await posts.json();
	const photosJson = await photos.json();

	const postsAndPhotos = postsJson.map((post, i) => {
		return { ...post, cover: photosJson[i].url };
	});

	return postsAndPhotos;
};
