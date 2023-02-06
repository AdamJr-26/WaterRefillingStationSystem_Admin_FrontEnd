import React from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";

function ListSkeletonLoading({ num_lines }) {
  let line_list = [];
  for (let i = 0; i < num_lines; i++) {
    line_list.push(i);
  }
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {line_list.map((line) => (
        <Flex key={line} gap={5}>
          <Skeleton
            height="70px"
            width="70px"
            borderRadius="50%"
            startColor="gray.200"
            endColor="gray.50"
          />
          <Flex direction="column" gap={3}>
            <Skeleton
              height="30px"
              width="500px"
              borderRadius="15px"
              startColor="gray.200"
              endColor="gray.50"
            />
            <Skeleton
              height="20px"
              width="250px"
              borderRadius="15px"
              startColor="gray.200"
              endColor="gray.50"
            />
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}

export default ListSkeletonLoading;
