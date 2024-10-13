import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
	static table = 'posts';

	@text('title') title;
	@text('subtitle') subtitle;
	@text('body') body;
	@field('is_pinned') isPinned;
	@field('likes') likes;
	@readonly @date('created_at') createdAt;
	@readonly @date('updated_at') updatedAt;
}
