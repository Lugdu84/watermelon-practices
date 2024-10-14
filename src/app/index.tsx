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
		// await countPosts();
		// const posts = await getSortedPosts();
		// const posts = await getPinnedPosts();
		// const posts = await getPostByTitle('56');
		// const posts = await getPostByTitleSanitize('post');
		// const posts = await getPostsWithIncludes('7');
		// const posts = await getLikesPosts(20);
		// const posts = await getLikesPostsBetween(50, 90);
		const posts = await getLikesPostsAndOr();
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
