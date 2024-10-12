import { Button, View } from 'react-native';
import { createPost } from '@/database/functions';

export default function HomeScreen() {
	const newPost = {
		title: 'Hello world',
		// body: 'This is a test post',
		// subtitle: 'This is a subtitle',
	};
	const handleCreatePost = async () => {
		await createPost(newPost);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Button
				title="Créer un post"
				onPress={handleCreatePost}
			/>
		</View>
	);
}
