import { Link, Stack } from 'expo-router';
import { Text } from 'react-native-paper';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '~/components/safe-container';

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ headerTitle: 'Oops!' }} />

      <Container>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </Container>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
