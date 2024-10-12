import { database } from '@database/database';
import Post from './model/Post';

type PostType = {
	title: string;
	subtitle?: string;
	body?: string;
};

export async function createPost({ title, body, subtitle }: PostType) {
	await database.write(async () => {
		const newPost = await database.get<Post>('posts').create((post) => {
			post.title = title;
			post.body = body;
			post.subtitle = subtitle;
		});
		console.log('new post', newPost._raw);
	});
}
