module Api
  module V1
    class ResourcesController < ApplicationController
      before_action :find_resource, only: %i[show edit update destroy]

      def index
        respond_to do |format|
          format.json { render json: { resources: Resource.all, status: 200 } }
        end
      end

      def show
        respond_with @resource
      end

      def create
        @resource = Resource.new(resource_params)

        if @resource.save
          respond_with @resource
        else
          respond_with @resource.errors
        end
      end

      def update
        if @resource.update(resource_params)
          respond_to do |format|
            format.json { render json: { resource: @resource, status: 200 } }
          end
        else
          respond_to do |format|
            format.json { render json: { errors: @resource.errors, status: 401 } }
          end
        end
      end

      def destroy
        respond_with status: 200
      end

      private

      def find_resource
        @resource = Resource.find(params[:id])
      end

      def resource_params
        params.require(:resource).permit(:title, :description, :url, :resource_type)
      end
    end
  end
end
