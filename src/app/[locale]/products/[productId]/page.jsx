// app/[locale]/products/[productId]/page.tsx

import {
  getSingleProductData,
  getRelatedProductsData,
} from "@/apiCalls/products/getAllProductsData";
import { SingleProductComponent } from "@/components/products/singleProduct/SingleProductComponent";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const res = await getSingleProductData(params.productId);
    const product = res?.data;

    return {
      title: product?.name || "منتج",
      description: product?.description || "",
    };
  } catch {
    return { title: "منتج" };
  }
}

const ProductPage = async ({ params }) => {
  try {
    const singleProductData = await getSingleProductData(params.productId);

    if (!singleProductData?.success || !singleProductData?.data) {
      notFound();
    }

    const product = singleProductData.data;

    const categoryId =
      product?.category?._id ||
      product?.categoryId?._id ||
      product?.categoryId ||
      "";

    const relatedProductsData = await getRelatedProductsData({
      categoryId,
      limit: 4,
    });

    console.log("product ", product, categoryId);

    return (
      <Suspense fallback={<LoaderS1 />}>
        <SingleProductComponent
          product={product}
          relatedProducts={relatedProductsData?.data?.data?.items || []}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
};

export default ProductPage;
