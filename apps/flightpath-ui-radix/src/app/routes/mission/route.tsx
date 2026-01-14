import { Card, Flex, Heading, Text } from '@radix-ui/themes';

import styles from './route.module.css';

export function MissionView() {
  return (
    <Flex
      align="center"
      className={styles.container}
      direction="column"
      flexGrow="1"
      justify="center"
    >
      <Card>
        <Flex direction="column" gap="3" px="6" py="3">
          <Heading as="h2" size="5">
            Mission Planner
          </Heading>
          <Text as="p" color="gray" size="3">
            Coming soon...
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
