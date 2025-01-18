<template>
    <div class="p-3" v-for="index in 5" :key="index">
        <div class="space-y-4">
            <div
                class="p-4 border rounded-lg shadow-md flex justify-between dark:bg-gray-800 dark:border-none bg-white">
                <div class="flex space-x-4">
                    <div class="w-24 h-24">
                        <USkeleton class="w-full h-full rounded-md dark:bg-gray-400 bg-gray-500" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <USkeleton class="w-36 h-8 rounded-md dark:bg-gray-400 bg-gray-500" />
                        <USkeleton class="w-20 h-4 rounded-md dark:bg-gray-400 bg-gray-500" />
                        <USkeleton class="w-10 h-4 rounded-md dark:bg-gray-400 bg-gray-500" />
                        <USkeleton class="w-8 h-2 rounded-md dark:bg-gray-400 bg-gray-500" />
                    </div>
                </div>
                <div class="my-auto text-end flex gap-2">
                    <USkeleton class="w-20 h-10 bg-yellow-400" />
                    <USkeleton class="w-20 h-10 bg-red-400" />
                </div>
            </div>
        </div>
    </div>
</template>
