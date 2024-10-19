import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Post from '@/database/model/Post';
import { Feather } from '@expo/vector-icons';
import { withObservables } from '@nozbe/watermelondb/react';

import { deletePost, getPosts } from '@/database/functions';
type PostType = {
	posts: Post[];
};

// 1. Pas de props à observer
const enhance = withObservables([], () => ({
	posts: getPosts(),
}));

// 2 Props à observer
// const enhance = withObservables(['post'], ({ post }) => ({

// }));

function ListPost({ posts }: PostType) {
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id}
			contentContainerStyle={{ padding: 10 }}
			ListFooterComponent={
				<View style={styles.footer}>
					<Text style={styles.footerText}>
						Appuyez longuement sur un élément pour le supprimer
					</Text>
				</View>
			}
			renderItem={({ item }) => (
				<Pressable
					style={styles.cardRow}
					onLongPress={() => deletePost(item.id)}>
					<View style={styles.title}>
						<Text>
							{item.title} - {item.id}
						</Text>
						<Text style={styles.likes}>{item.likes} likes</Text>
					</View>

					<View style={styles.checked}>
						{item.isPinned ? (
							<Feather
								name="check-circle"
								size={24}
								color="green"
							/>
						) : (
							<View />
						)}
					</View>
				</Pressable>
			)}
		/>
	);
}

export default enhance(ListPost);

const styles = StyleSheet.create({
	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		width: '100%',
	},
	title: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
	},
	likes: {
		width: 60,
	},
	checked: {
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer: {
		padding: 10,
	},
	footerText: {
		fontSize: 12,
		fontStyle: 'italic',
	},
});
