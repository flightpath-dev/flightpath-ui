import { Flex, Text } from '@radix-ui/themes';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import styles from './IconText.module.css';

interface IconTextProps {
  icon: LucideIcon;
  children: ReactNode;
  iconSize?: number;
  textSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  mono?: boolean;
}

export function IconText({
  icon: Icon,
  children,
  iconSize = 16,
  textSize = '2',
  mono = false,
}: IconTextProps) {
  return (
    <Flex align="center" gap="2">
      <Icon size={iconSize} />
      <Text className={mono ? styles.mono : undefined} size={textSize}>
        {children}
      </Text>
    </Flex>
  );
}
