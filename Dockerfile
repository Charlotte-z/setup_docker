FROM nginx:1.21.6-alpine

ARG DEV_MODE
ENV DEV_MODE $DEV_MODE

RUN echo "test"