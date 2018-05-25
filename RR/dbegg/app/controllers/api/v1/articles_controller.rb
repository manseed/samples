module Api
  module V1
    class ArticlesController < ApplicationController
      def index
        articles= Article.order('title');
        render json:{status:'sucess',message:'Load articlesssss',data:articles},status: :ok
      end

      def show
        articles=Article.find(params[:id])
        render json:{status:'sucess',message:'Load one article',data:articles},status: :ok
      end
      def create
        article=Article.new(article_params)
        if article.save
          render json:{status:'sucess',message:'Article saved',data:article},status: :ok
        else
          render json:{status:'Not sucess',message:'Error',data:article_errors},status: :unprocessable_entity
        end
      end
      def destroy
       articles=Article.find(params[:id])
       articles.destroy
       render json:{status:'sucess',message:'Deleted',data:articles},status: :ok
      end
      def update
       article=Article.find(params[:id])
        if article.update_attributes(article_params)
           render json:{status:'sucess',message:'Updated',data:article},status: :ok
        else
            ender json:{status:'Not sucess',message:'Error',data:article_errors},status: :unprocessable_entity     
        end
      end
      private
        def article_params
          params.permit(:title,:body)
        end
    end
  end
end
