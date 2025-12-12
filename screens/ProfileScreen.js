import { View, Text, StyleSheet, Pressable, useWindowDimensions, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADII, FONTS } from '../theme';

// Android için animasyonu aktifleştir
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PROFILES = [
  { 
    id: '1', 
    name: 'Mehmet Taha Yilmaz', 
    role: 'Computer Engineering Student',
    location: 'Istanbul, TR',
    bio: 'Learning React Native.'
  },
  { 
    id: '2', 
    name: 'Goktug Varan', 
    role: 'Computer Engineering Student',
    location: 'Ankara, TR',
    bio: 'UI/UX designer.'
  },
  { 
    id: '3', 
    name: 'Beril Gungor', 
    role: 'Computer Engineering Student',
    location: 'Izmir, TR',
    bio: 'Software engineering student.'
  },
];

// Kartın Kapalı ve Açık Boyutları (Milimetrik Ayar)
const CARD_HEIGHT_COLLAPSED = 300;
const CARD_HEIGHT_EXPANDED = 380; 

const ProfileCard = ({ item, currentTheme, isLargeScreen }) => {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <Pressable 
      activeOpacity={0.9} 
      onPress={toggleExpand}
      style={[
        styles.card, 
        { 
          backgroundColor: currentTheme.card,
          width: isLargeScreen ? '60%' : '85%',
          padding: isLargeScreen ? SPACING.xl : SPACING.lg,

          height: expanded ? CARD_HEIGHT_EXPANDED : CARD_HEIGHT_COLLAPSED
        }
      ]}
    >
        {}
      <View style={styles.headerContent}>
        <Ionicons
          name="person-circle-outline"
          size={isLargeScreen ? 100 : 80}
          color={currentTheme.text}
        />
        
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={[styles.name, { color: currentTheme.text }]}>
            {item.name}
          </Text>
          <Text numberOfLines={2} style={[styles.role, { color: currentTheme.text }]}>
            {item.role}
          </Text>
        </View>
      </View>

      {}
      <View style={[
        styles.detailsContainer, 
        { 
          height: expanded ? 80 : 0,
          marginTop: expanded ? SPACING.md : 0,
          opacity: expanded ? 1 : 0
        }
      ]}>
        <View style={styles.row}>
          <Ionicons name="location-sharp" size={16} color={currentTheme.text} style={{ opacity: 0.6 }} />
          <Text style={[styles.detailText, { color: currentTheme.text }]}> {item.location}</Text>
        </View>
        <Text numberOfLines={2} style={[styles.bioText, { color: currentTheme.text }]}>
          "{item.bio}"
        </Text>
      </View>

      {}
      <View style={styles.actionButtons}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: liked ? '#e63946' : '#ff6b6b', opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={(e) => {
            e.stopPropagation();
            setLiked(!liked);
            console.log(`${item.name} Liked: ${!liked}`);
          }}
        >
          <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color="#fff" />
          <Text style={styles.buttonText}>{liked ? "Liked" : "Like"}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: following ? '#457b9d' : '#1d3557', opacity: pressed ? 0.8 : 1, marginLeft: 10 }
          ]}
          onPress={(e) => {
            e.stopPropagation();
            setFollowing(!following);
            console.log(`${item.name} Following: ${!following}`);
          }}
        >
          <Ionicons name={following ? "checkmark-circle" : "person-add"} size={20} color="#fff" />
          <Text style={styles.buttonText}>{following ? "Following" : "Follow"}</Text>
        </Pressable>
      </View>

      {}
      <View style={[styles.chevronContainer, { opacity: expanded ? 0 : 0.5 }]}>
         <Ionicons name="chevron-down" size={20} color={currentTheme.text} />
      </View>

    </Pressable>
  );
};

export default function ProfileScreen() {
  const [theme, setTheme] = useState('light');
  const currentTheme = COLORS[theme];
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 500;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <Pressable onPress={toggleTheme} style={styles.themeToggle}>
        <Ionicons name={theme === 'light' ? 'moon' : 'sunny'} size={28} color={currentTheme.text} />
      </Pressable>

      <FlatList
        data={PROFILES}
        renderItem={({ item }) => (
          <ProfileCard item={item} currentTheme={currentTheme} isLargeScreen={isLargeScreen} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { alignItems: 'center', paddingTop: 80, paddingBottom: 40, gap: SPACING.lg },
  themeToggle: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: SPACING.sm },
  
  card: {
    borderRadius: RADII.md, 
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6,
    marginBottom: SPACING.md,
    justifyContent: 'space-between',
    overflow: 'hidden' 
  },
  
  headerContent: { alignItems: 'center', width: '100%', marginTop: 10 },
  textContainer: { alignItems: 'center', marginTop: 10, height: 60, justifyContent: 'flex-start' },
  
  name: { fontFamily: FONTS.bold, fontSize: 20, textAlign: 'center' },
  role: { fontFamily: FONTS.regular, fontSize: 14, marginTop: 4, opacity: 0.7, textAlign: 'center' },
  
  detailsContainer: { 
    width: '100%', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#ddd', 
    paddingTop: 10,
    justifyContent: 'center',
    overflow: 'hidden' 
  },
  
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  detailText: { fontFamily: FONTS.regular, fontSize: 14, opacity: 0.8 },
  bioText: { fontFamily: FONTS.regular, fontStyle: 'italic', fontSize: 14, textAlign: 'center', marginTop: 5, paddingHorizontal: 10 },
  
  actionButtons: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    paddingTop: 5 
  },
  
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 8, 
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 120 
  },
  buttonText: { color: '#fff', fontFamily: FONTS.bold, fontSize: 14, marginLeft: 6 },

  chevronContainer: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems: 'center'
  }
});