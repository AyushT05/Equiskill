"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Course } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import RichEditor from "@/components/custom/RichEditor"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters long",
  }),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subcategoryId: z.string().min(1, {
    message: "Sub-category is required",
  }),
  levelId: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().optional(),
})


interface EditCourseFormProps {
  course: Course
}

const EditCourseForm = ({ course }: EditCourseFormProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      subtitle: course.subtitle || "",
      description: course.description || "",
      categoryId: course.categoryId,
      subcategoryId: course.subCategoryId,
      levelId: course.levelId || "",
      imageUrl: course.imageUrl || "",
      price: course.price || undefined,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Web Development for Beginners" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Title</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Become a full stack developer with one course " {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RichEditor
                  placeholder="What is this course about?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default EditCourseForm
