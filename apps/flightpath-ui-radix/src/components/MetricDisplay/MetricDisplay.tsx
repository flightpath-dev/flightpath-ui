import { Flex, Text } from '@radix-ui/themes';

import type { AccentColor } from '../../types/AccentColor';

import styles from './MetricDisplay.module.css';

interface MetricDisplayProps {
  label: string;
  value: string;
  unit?: string;
  color?: AccentColor;
}

export function MetricDisplay({
  label,
  value,
  unit,
  color,
}: MetricDisplayProps) {
  return (
    <Flex direction="column">
      <Text className={styles.label} size="1">
        {label}
      </Text>
      <Flex align="baseline" gap="1">
        <Text className={styles.value} color={color} size="4">
          {value}
        </Text>
        {unit !== undefined && unit !== '' && (
          <Text className={styles.unit} color={color} size="1">
            {unit}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
