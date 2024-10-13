import { database } from '@database/database';
import { Q } from '@nozbe/watermelondb';
import Post from './model/Post';

type PostType = {
	title: string;
	subtitle?: string;
	body?: string;
	isPinned?: boolean;
	likes?: number;
};

export const resetDB = async () => {
	await database.write(async () => {
		await database.unsafeResetDatabase();
	});
};

export const createPost = async ({
	title,
	body,
	subtitle,
	isPinned = false,
	likes = 0,
}: PostType) => {
	const newPost = await database.write(async () => {
		const createdPost = await database.get<Post>('posts').create((post) => {
			post.title = title;
			post.body = body;
			post.subtitle = subtitle;
			post.isPinned = isPinned;
			post.likes = likes;
		});
		return createdPost;
	});
	return newPost;
};

// 1. fetch simple pour récupérer tous les Posts
export const getPosts = async () => {};

// 2. count all Posts
export const countPosts = async () => {};

// 3. sort all Posts (sortBy, asc/desc)
export const getSortedPosts = async () => {};

// 4. only pinned Posts (eq) or true/false
export const getPinnedPosts = async () => {};

// 5. filter Posts with fragment of title (like)
export const getPostByTitle = async (text: string) => {};

// 6. utilisez sanitize pour rendre safe les données provenant d'entrées utilisateur

export const getPostByTitleSanitize = async (text: string) => {};

// 7. with includes (fragment of title, case sensitive)
export const getPostsWithIncludes = async (text: string) => {};

// 8. gte,gt,lte,lt
export const getLikesPosts = async (num: number) => {};

// 9. likes entre num1 et num2
export const getLikesPostsBetween = async (num1: number, num2: number) => {};

// and et or
export const getLikesPostsAndOr = async () => {};
