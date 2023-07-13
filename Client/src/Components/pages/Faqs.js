import React from "react";

const Faqs = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: "1000px" }}>
      <section>
        <h1>still working to be done here</h1>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <div>
              <p className="mb-1">
                <strong>Standard length question?</strong>
              </p>
              <p className="mb-1">
                <u>Higlighted short answer.</u> And some kind of detailed list.
              </p>
              <ul>
                <li>list item 1</li>
                <li>list item 2</li>
                <li>list item 3</li>
              </ul>
            </div>

            <div>
              <p className="mb-1">
                <strong>Short question?</strong>
              </p>
              <p className="mb-1">
                <u>Higlighted short answer.</u>
              </p>
              <p className="mb-1">
                Second part of the answer with more details.
              </p>
              <p>
                Final part of the answer full of detais and Lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div>
              <p className="mb-1">
                <strong>
                  The longest question in this faq. Made up of two sentences in
                  order to span to the next line?
                </strong>
              </p>
              <p className="mb-1">
                <u>Higlighted short answer.</u>
              </p>
              <p className="mb-1">
                Second part of the answer with more details.
              </p>
              <p>
                Final part of the answer full of detais and Lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div>
              <p className="mb-1">
                <strong>Slightly longer question?</strong>
              </p>
              <p className="mb-1">
                <u>Higlighted short answer.</u>
              </p>
              <p className="mb-1">
                Second part of the answer with more details.
              </p>
              <p>
                Final part of the answer full of detais and Lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <p>
              <span className="fw-bold">
                Still have any questions? Contact us to get your answer!
              </span>
            </p>

            <form>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
 
export default Faqs