import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type VerifiedBadgeProps = {
  size?: number;
};

const VerifiedBadge = ({size = 14} : VerifiedBadgeProps) => {
    return <MaterialCommunityIcons name="check-decagram" size={size} color={Colors.dark.verified} />;
}

export default VerifiedBadge;