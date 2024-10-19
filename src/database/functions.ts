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

export const randomPost = () => {
	return {
		title: `Post ${Math.floor(Math.random() * 100)}`,
		body: 'This is a body',
		isPinned: Math.random() > 0.5,
		likes: Math.floor(Math.random() * 100),
	};
};

// 1. fetch simple pour récupérer tous les Posts
export const getPosts = () => {
	const posts = database.get<Post>('posts').query().observe();
	return posts;
};

// supprimer un post
export const deletePost = (id: string) => {
	database.write(async () => {
		const post = await database.get<Post>('posts').find(id);
		await post.destroyPermanently();
	});
};

// 2. count all Posts
export const countPosts = async () => {
	const count = await database.get<Post>('posts').query().fetchCount();
	console.log('count', count);
};

// Utilisation de Q pour les requêtes =>

// 3. sort all Posts (sortBy, asc/desc)
export const getSortedPosts = async () => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.sortBy('likes', Q.asc));
	return posts;
};

// 4. only pinned Posts (eq) or true/false
export const getPinnedPosts = async () => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('is_pinned', true));
	return posts;
};

// 5. filter Posts with fragment of title (like)
export const getPostByTitle = async (text: string) => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('title', Q.like(`%${text}%`)))
		.fetch();
	return posts;
};

// 6. utilisez sanitizeLikeString dans votre like pour rendre safe les données provenant d'entrées utilisateur
export const getPostByTitleSanitize = async (text: string) => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('title', Q.like(`%${Q.sanitizeLikeString(text)}%`)))
		.fetch();
	return posts;
};

// 7. with includes (fragment of title, case sensitive)
export const getPostsWithIncludes = async (text: string) => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('title', Q.includes(text)))
		.fetch();
	return posts;
};

// 8. gte,gt,lte,lt
export const getLikesPosts = async (num: number) => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('likes', Q.lte(num)))
		.fetch();
	return posts;
};

// 9. likes entre num1 et num2
export const getLikesPostsBetween = async (num1: number, num2: number) => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.where('likes', Q.between(num1, num2)))
		.fetch();
	return posts;
};

// and et or
export const getLikesPostsAndOr = async () => {
	const posts = await database
		.get<Post>('posts')
		.query(Q.or(Q.where('likes', Q.gt(80)), Q.where('is_pinned', true)))
		.fetch();
	return posts;
};
