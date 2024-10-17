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
	randomPost,
	resetDB,
} from '@/database/functions';
import { useEffect, useState } from 'react';
import Post from '@/database/model/Post';
import ListPost from '@/components/ListPost';

export default function HomeScreen() {
	const handleCreatePost = async () => {
		await createPost(randomPost());
	};

	const handleResetDB = async () => {
		await resetDB();
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
			<ListPost />
		</View>
	);
}
