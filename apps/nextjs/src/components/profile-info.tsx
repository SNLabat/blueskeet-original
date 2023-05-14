import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react-native";

import { useAuthedAgent } from "../lib/agent";
import { queryClient } from "../lib/query-client";
import { RichTextWithoutFacets } from "./rich-text";

interface Props {
  profile: ProfileViewDetailed;
  backButton?: boolean;
}

export const ProfileInfo = ({ profile, backButton }: Props) => {
  const agent = useAuthedAgent();
  const router = useRouter();

  const toggleFollow = useMutation({
    mutationKey: ["follow", profile.did],
    mutationFn: async () => {
      if (profile.viewer?.following) {
        await agent.deleteFollow(profile.viewer?.following);
      } else {
        await agent.follow(profile.did);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries(["profile", profile.handle]);
      void queryClient.invalidateQueries(["network"]);
    },
  });

  return (
    <View className="relative">
      <Image source={{ uri: profile.banner }} className="h-32 w-full" alt="" />
      {backButton && (
        <TouchableOpacity
          accessibilityLabel="Back"
          accessibilityRole="button"
          onPress={() => router.back()}
          className="absolute left-4 top-4 items-center justify-center rounded-full bg-black/60 p-2"
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>
      )}
      <View className="relative border-b border-neutral-300 bg-white px-4 pb-4 dark:border-neutral-600 dark:bg-black">
        <View className="h-10 flex-row items-center justify-end">
          <View className="absolute -top-11 left-0 rounded-full border-4 border-white bg-white dark:border-black dark:bg-black">
            <Image
              source={{ uri: profile.avatar }}
              className="h-20 w-20 rounded-full"
              alt=""
            />
          </View>
          {agent.session?.handle !== profile.handle && (
            <Button
              disabled={toggleFollow.isLoading}
              onPress={() => toggleFollow.mutate()}
              title={profile.viewer?.following ? "Following" : "Follow"}
            />
          )}
        </View>
        <Text className="mt-1 text-2xl font-medium dark:text-neutral-50">
          {profile.displayName}
        </Text>
        <Text>
          {profile.viewer?.followedBy && (
            <>
              <Text className="bg-neutral-100 px-1 font-semibold dark:bg-neutral-900">
                <Text className="dark:text-neutral-50">{" Follows you "}</Text>
              </Text>{" "}
            </>
          )}
          <Text className="text-neutral-500 dark:text-neutral-400">
            @{profile.handle}
          </Text>
        </Text>
        <View className="mt-3 flex-row">
          <Text>
            <Text className="font-bold dark:text-neutral-50">
              {profile.followersCount}
            </Text>{" "}
            <Text className="dark:text-neutral-50">Followers</Text>
          </Text>
          <Text className="ml-4">
            <Text className="font-bold dark:text-neutral-50">
              {profile.followsCount}
            </Text>{" "}
            <Text className="dark:text-neutral-50">Following</Text>
          </Text>
          <Text className="ml-4">
            <Text className="font-bold dark:text-neutral-50">
              {profile.postsCount ?? 0}
            </Text>{" "}
            <Text className="dark:text-neutral-50">Posts</Text>
          </Text>
        </View>
        {profile.description && (
          <View className="mt-3">
            <RichTextWithoutFacets text={profile.description} />
          </View>
        )}
      </View>
    </View>
  );
};
