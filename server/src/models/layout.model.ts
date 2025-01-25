import { Document,Schema,model } from "mongoose"; 
import { title } from "process";

interface FaqItem extends Document {
   question: string;
   answer: string; 
}

interface Category extends Document {
    title: string;
}

interface BannerImage extends Document {
    public_id: string;
    url: string;
}

interface Layout extends Document {
   type:string;
   faq: FaqItem[];
    categories: Category[];
    banner:{
        title: string;
        image: BannerImage;
        subtitle: string;
      }

    }
const faqSchema = new Schema<FaqItem>({
    question: { type: String },
    answer: { type: String},
});

const categorySchema = new Schema<Category>({
    title: { type: String },
});
const bannerImageSchema = new Schema<BannerImage>({
    public_id: { type: String },
    url: { type: String },
});

const layoutSchema = new Schema<Layout>({
type: { type: String },
faq: [faqSchema],
categories: [categorySchema],
banner: {
    title: { type: String },
    image: bannerImageSchema,
    subtitle: { type: String },
},

});
const LayoutModel = model<Layout>("Layout", layoutSchema);
export default LayoutModel;