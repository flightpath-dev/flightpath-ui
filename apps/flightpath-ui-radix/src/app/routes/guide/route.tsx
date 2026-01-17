import { Card, Flex, Heading, Text } from '@radix-ui/themes';

import styles from './route.module.css';

export function GuideView() {
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
            Guided Mode
          </Heading>
          <Text as="p" color="gray" size="3">
            AI-powered autonomous flight - Coming soon...
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
