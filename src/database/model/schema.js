import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
	version: 3,
	tables: [
		tableSchema({
			name: 'posts',
			columns: [
				{ name: 'title', type: 'string' },
				{ name: 'subtitle', type: 'string', isOptional: true },
				{ name: 'body', type: 'string' },
				{ name: 'is_pinned', type: 'boolean' },
				{ name: 'created_at', type: 'number' },
				{ name: 'updated_at', type: 'number' },
				{ name: 'likes', type: 'number' },
				{ name: 'description', type: 'string', isOptional: true },
			],
		}),
	],
});
