import {
	schemaMigrations,
	addColumns,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
	migrations: [
		// add columns likes, with type 'number' to 'posts' table
		{
			toVersion: 2,
			steps: [
				addColumns({
					table: 'posts',
					columns: [{ name: 'likes', type: 'number' }],
				}),
			],
		},
	],
});
