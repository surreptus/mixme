import React from 'react'

import { Box, Flex, Text, Link, HStack} from '@chakra-ui/react'

export default function Footer () {
  return (
    <Box mt={5}>
      <Flex my={2} justify={'center'}>
        <Text>mixme, a cocktail journal</Text>
      </Flex>
      <Flex justify={'center'}>
        <HStack spacing={3}>
          <Text>© {new Date().getFullYear()}</Text>
          <Link href='https://github.com/surreptus/mixme' isExternal >Contribute</Link>
        </HStack>
      </Flex>
    </Box>
  )
}
