import { Button, View } from 'react-native';
import {
	countPosts,
	createPost,
	getLikesPosts,
	getLikesPostsAndOr,
	getLikesPostsBetween,
	getPinnedPosts,
	getPostByTitle,
	getPostByTitleSanitize,
	getPosts,
	getPostsWithIncludes,
	getSortedPosts,
	resetDB,
} from '@/database/functions';
import { useEffect, useState } from 'react';
import Post from '@/database/model/Post';
import ListPost from '@/components/ListPost';

export default function HomeScreen() {
	const [posts, setPosts] = useState<Post[]>([]);

	const newPost = {
		title: `Post ${Math.floor(Math.random() * 100)}`,
		body: 'This is a body',
		// subtitle: 'This is a subtitle',
		// isPinned: true,
		// random isPinned
		isPinned: Math.random() > 0.5,
		likes: Math.floor(Math.random() * 100),
	};
	const handleCreatePost = async () => {
		const post = await createPost(newPost);
		setPosts([...posts, post]);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		// const posts = await getPosts();
		// const posts = await countPosts();
		// const posts = await getSortedPosts();
		// const posts = await getPinnedPosts();
		// const posts = await getPostByTitle('post');
		// const posts = await getPostByTitleSanitize('post');
		// const posts = await getPostsWithIncludes('post');
		// const posts = await getLikesPosts(70);
		// const posts = await getLikesPostsBetween(30, 50);
		// const posts = await getLikesPostsAndOr();
		setPosts(posts);
	};

	const handleResetDB = async () => {
		await resetDB();
		setPosts([]);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Button
				title="Reset"
				onPress={handleResetDB}
			/>
			<Button
				title="Créer un post"
				onPress={handleCreatePost}
			/>
			<ListPost posts={posts} />
		</View>
	);
}
