import { View } from 'react-native';

import PostActions  from '@/components/feed/PostActions';
import PostCaption  from '@/components/feed/PostCaption';
import PostHeader   from  '@/components/feed/PostHeader';
import PostMedia    from   '@/components/feed/PostMedia';
import {getUserById}  from '@/data/users';
import type { post } from '@/types/models';

type PostCardProps = {
  post : post;
  showFollow?: boolean;
};

const PostCard = ({ post, showFollow = true }: PostCardProps) => {
    const author = getUserById(post.authorId);
    const collaborator = post.collaboratorId ? getUserById(post.collaboratorId) : undefined;

    // for bad data , instead of crashing , it will render nothing , acts like a gaurd clause 
    if (!author){
      return null;
    }

    return (
      <View>
        <PostHeader author={author} collaborator={collaborator} showFollow={showFollow} />
        <PostMedia imageUrls={post.imageUrls} />
        <PostActions post={post} />
        <PostCaption username={author.username} caption={post.caption} hoursAgo={post.hoursAgo} />
      </View>
    );
};

export default PostCard;

