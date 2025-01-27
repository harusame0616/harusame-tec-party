import { useForm } from "react-hook-form";
import Turnstile, { useTurnstile } from "react-turnstile";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCommentPost } from "../hooks/use-comment-post";

const FormSchema = z.object({
	name: z
		.string()
		.min(1, "名前は必須です。")
		.max(20, "名前は20文字以内にしてください。"),
	text: z
		.string()
		.min(1, "本文は必須です。")
		.max(1024, "本文は1024文字以内にしてください。"),
	token: z.string().min(1, "検証を行ってください。"),
});
type FormSchema = z.infer<typeof FormSchema>;

type Props = {
	slug: string;
};
export function CommentForm({ slug }: Props) {
	const commentPost = useCommentPost(slug);
	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			text: "",
			token: "",
		},
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		await commentPost.post(data.name, data.text, data.token);
		form.reset();
	});

	return (
		<Form {...form}>
			<form
				onSubmit={
					commentPost.isMutating
						? (e) => {
								e.preventDefault();
							}
						: handleSubmit
				}
				className="space-y-1"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<div>
								<FormLabel>名前</FormLabel>
								<FormDescription>
									1文字以上、20文字以内で入力してください。
								</FormDescription>
							</div>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<div>
								<FormLabel>本文</FormLabel>
								<FormDescription>
									1 文字以上、1024 文字以内で入力してください。
								</FormDescription>
							</div>
							<FormControl>
								<Textarea rows={8} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Turnstile
					sitekey="0x4AAAAAAA6YNSB-ZSIK1MLX"
					refreshExpired="auto"
					fixedSize
					onVerify={(token) => {
						form.setValue("token", token);
					}}
				/>
				<Button
					type="submit"
					aria-disabled={commentPost.isMutating}
					className="aria-disabled:opacity-30"
					aria-live="polite"
				>
					{commentPost.isMutating ? (
						<>
							コメントを投稿中
							<ReloadIcon className="animate-spin" aria-hidden />
						</>
					) : (
						"コメントを投稿"
					)}
				</Button>
			</form>
		</Form>
	);
}
